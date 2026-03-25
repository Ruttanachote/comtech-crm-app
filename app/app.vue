<script setup lang="ts">
  import { useSystemStore } from '~~/stores/useSystemStore';
  import { useAuthStore } from '~~/stores/useAuthStore';
  import AppHeaderMenu from '~/layout/AppHeaderMenu.vue';
  import AppSideMenu from '~/layout/AppSideMenu.vue';
  import ConfirmModal from '~/components/modal/ConfirmModal.vue';

  const route = useRoute();
  const systemStore = useSystemStore();
  const authStore = useAuthStore();
  const { t } = useI18n();

  const isOpenlogout = computed({
    get: () => systemStore.showLogoutModal,
    set: (value) => {
      systemStore.showLogoutModal = value;
    },
  });

  const onSave = async () => {
    systemStore.showLogoutModal = false;
    await authStore.logout();
  };

  const onCancel = () => {
    systemStore.showLogoutModal = false;
  };
  // Computed
  const showLayout = computed(() => {
    // If we're on a public auth page, don't show layout
    if (route.path.startsWith('/auth/')) return false;
    return route.meta.layout !== false;
  });

  // Debugging route meta
  watch(
    () => route.meta,
    (newMeta) => {
      console.log('Route Meta changed:', newMeta);
      console.log('showLayout computed value:', showLayout.value);
    },
    { immediate: true }
  );
</script>
<template>
  <ClientOnly>
    <UApp>
      <NuxtPwaManifest />
      <NuxtLayout>
        <div>
          <div class="flex h-screen w-full overflow-hidden">
            <!-- Side Menu (Left, Full Height) -->
            <AppSideMenu class="shrink-0 h-full z-20" />

            <!-- Main Content (Right) -->
            <div class="flex flex-col flex-1 min-w-0">
              <AppHeaderMenu class="sticky top-0 z-10 shrink-0" />
              <NuxtLayout>
                <UMain class="flex-1 min-h-0 overflow-y-auto bg-[#F9FAFE] dark:bg-gray-900 p-2">
                  <NuxtPage />
                </UMain>
              </NuxtLayout>
              <UFooter
                class="sticky bottom-0 z-10 shrink-0"
                :ui="{
                  root: 'border-t border-gray-100 dark:border-gray-800 text-xs',
                  container: 'py-2 sm:py-0 md:py-0 lg:py-4',
                }"
              >
                © {{ new Date().getFullYear() }} SCGJWD | Dynamic IT Solutions. All rights reserved.
              </UFooter>
            </div>
          </div>
        </div>

        <Teleport to="body">
          <ConfirmModal
            :open="isOpenlogout"
            :title="t('common.logout_title') || 'Logout Confirmation'"
            :description="t('common.logout_desc') || 'Are you sure you want to logout?'"
            @confirm="onSave"
            @cancel="onCancel"
          />
        </Teleport>
      </NuxtLayout>
    </UApp>
  </ClientOnly>
</template>
