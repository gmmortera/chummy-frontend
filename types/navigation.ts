enum Tabs {
  Home = 'home',
  Notifications = 'notifications'
}

interface Tab {
  id: Tabs
  label: string
  icon: string
}

export {
  type Tab,
  Tabs
}
