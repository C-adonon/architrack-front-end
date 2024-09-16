<script setup>
import logo from "./../../assets/static/logo.svg";
import LogoutBtn from "@/components/buttons/LogoutBtn.vue";
import NavTab from "@/components/nav/NavTab.vue";
import NavSubtitle from "@/components/nav/NavSubtitle.vue";
import NavUserInfo from "@/components/nav/NavUserInfo.vue";
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar-body">
      <div class="sidebar-logo">
        <img :src="logo" alt="logo" id="logo" />
      </div>

      <div class="sidebar-links">
        <ul class="nav-group">
          <NavSubtitle :text="`main`" />
          <li>
            <NavTab :text="`Dashboard`" :icon="`pi pi-gauge`" :path="`/`" />
          </li>
          <li>
            <NavTab
              :text="`applications`"
              :icon="`pi pi-database`"
              :path="`/applications`"
            />
          </li>
          <li>
            <NavTab
              :text="`Departments & Capabilities`"
              :icon="`pi pi-briefcase`"
              :path="`/businessprocess`"
            />
          </li>
          <li>
            <NavTab
              :text="`Providers`"
              :icon="`pi pi-building`"
              :path="`/providers`"
            />
          </li>
        </ul>
        <ul class="nav-group">
          <NavSubtitle :text="`notifications`" />
          <li>
            <NavTab
              :text="`Notifications`"
              :icon="`pi pi-bell`"
              :path="`/notifications`"
            />
          </li>
        </ul>
        <!-- <ul class="nav-group">
          <NavSubtitle :text="`Admin`" />
          <li>
            <NavTab
              :text="`User management`"
              :icon="`pi pi-users`"
              :path="`/admin`"
            />
          </li>
        </ul> -->
      </div>
    </div>

    <div class="sidebar-footer">
      <NavUserInfo />
      <LogoutBtn />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";

.sidebar-logo {
  text-align: center;
  #logo {
    max-width: 100%;
    max-height: 32px;
  }
}

.sidebar {
  height: 100vh;
  padding: 24px 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  .sidebar-body {
    display: flex;
    flex-direction: column;

    ul.nav-group {
      list-style-type: none;
      padding: 0;

      li {
        margin-bottom: 4px;
      }
    }
  }

  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>