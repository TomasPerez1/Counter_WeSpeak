# **Contador Persistente**

Este proyecto es un contador "persistente", lo que quiere decir que el valor del contador persiste globalmente y se actualiza automaticamente al modificarse en la DB.

El front esta construido en **Next js**, utilizando **Supabase** como DB y **Prisma** como ORM.

## **Instrucciones para configurar y ejecutar la aplicación**

### 1. **Clonar el repositorio**

```bash
git clone https://github.com/TomasPerez1/Counter_WeSpeak.git
```

### 2. **Configurar variables de entorno**

Crear archivo **.env** dentro de la carpeta counter-wespeak y completa con las credenciales de **supabase**:

. **DATABASE_URL**, **DIRECT_URL** son para la conexión a la DB y **NEXT_PUBLIC_SUPABASE_URL**, **NEXT_PUBLIC_SUPABASE_ANON_KEY** son para usar supabase en el cliente

`DATABASE_URL=""`
`DIRECT_URL=""`

`NEXT_PUBLIC_SUPABASE_URL=""`
`NEXT_PUBLIC_SUPABASE_ANON_KEY=""`

### 3. **Instalar dependencias**

```bash
npm install
```

### 4. **Inicializar Prisma**

```bash
npx prisma generate && npx prisma migrate deploy
```

### 5. **Correr el proyecto**

. Desarrollo

```bash
npm run dev
```

. Producción

```bash
npm run build && npm run start
```

## **Features**

- Incrementar/Decrementar:

Para modificar el contador utilice **server actions**, ideales para interactuar con el servidor, en este caso con la DB utilizadno **prisma**.

```javascript
// src/actions
'use server'
import { prisma } from '../app/lib/prisma'

export async function increment() {
  const counter = await prisma.counter.update({
    where: { id: 1 },
    data: { 
      value: {
        increment: 1,
      } 
    }
  })
  return counter.value;
}

```

- Resetear contador al pasar 20' sin actividad:

Para cumplir esto cree un Cron job con supabase, el mismo se ejecuta cada 20 minutos y si no hubo cambios en este lapso de tiempo lo reinicia a 0.

```SQL
// supabase/db/functions
BEGIN
  IF (
    SELECT "updatedAt" < now() - interval '20 minutes'
    FROM "Counter"
    WHERE id = 1
  ) THEN
    UPDATE "Counter" SET value = 0, "updatedAt" = now() WHERE id = 1;
    RAISE NOTICE 'Counter reset to 0';
  END IF;
END;

```

- Actualización en tiempo real:

Utilice `realtime` de Supabase para escuchar cambios en la base de datos y actualizar automáticamente la interfaz de usuario. Este realtime no es mas que websockets, que estan pendientes al evento `update` de mi counter. Cada vez que se modifique (ya sea de otra instancia de la aplicación) la tabla estara escuchando los cambios de supabase.

```javascript
// src/app/Counter.tsx
useEffect(() => {
    const channel = supabase
      .channel("realtime-counter")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Counter",
        },
        (payload) => {
          if(payload.new.value !== value) {
            setValue(payload.new.value)
          }
        }
      )
      .subscribe();
      
    console.log("CHANNEL", channel)
    return () => {
      channel.unsubscribe();
    };
  }, []);

```

- Adicionalmente implemente estados de `loading` para no realizar pedidos extras mientras se esta procesando, controlar `decrement` para que el valor no sea negativo