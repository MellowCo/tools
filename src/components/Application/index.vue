<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <n-message-provider>
          <slot name="default" />
        </n-message-provider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
