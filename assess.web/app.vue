<template>
  <div>
    <NuxtPage></NuxtPage>

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>
