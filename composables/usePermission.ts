export default function () {
  const { $user } = useAuth();

  const links = [
    {
      label: "Orders",
      icon: "bi:list-ol",
      to: "/admin/orders",
      name: "order",
    },
    {
      label: "Blog",
      icon: "i-heroicons-newspaper",
      to: "/admin/blog",
      name: "article",
    },
    {
      label: "Users",
      icon: "i-heroicons-users",
      to: "/admin/users",
      name: "user",
    },
    {
      label: "Product Addons",
      icon: "i-heroicons-cube",
      to: "/admin/addons",
      name: "additional",
    },
    {
      label: "Product",
      icon: "i-heroicons-cube",
      to: "/admin/products",
      name: "product",
    },
    {
      label: "Facility Locations",
      icon: "i-heroicons-map-pin",
      to: "/admin/facility-locations",
      name: "facilityLocation",
    },
    {
      label: "Locations",
      icon: "i-heroicons-map-pin",
      to: "/admin/locations",
      name: "location",
    },

    {
      label: "Contacts",
      icon: "i-heroicons-phone",
      to: "/admin/contacts",
      name: "contact",
    },

    {
      label: "Admins",
      icon: "i-heroicons-user-group",
      to: "/admin/user-admin",
      name: "admin",
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      to: "/admin/settings",
      name: "settings",
    },
  ];

  const userPermission = computed(() => {
    return $user.value?.permissions ?? [];
  });

  function hasPermission(
    name:
      | "order"
      | "article"
      | "user"
      | "additional"
      | "product"
      | "location"
      | "contact"
      | "admin"
  ) {
    if ($user.value?.id === 1) {
      return true;
    }

    const permission = userPermission.value.find(
      (el) => el.feature_name === name
    );

    if (!permission) return false;

    return permission?.type === "full";
  }

  function hasPermissionVisit(
    name:
      | "order"
      | "article"
      | "user"
      | "additional"
      | "product"
      | "location"
      | "contact"
      | "admin"
  ) {
    if ($user.value?.id === 1) {
      return true;
    }

    return !!userPermission.value.find((el) => el.feature_name === name);
  }

  const linksAllowed = computed(() => {
    if ($user.value?.id === 1) {
      return links;
    }

    const defaultPermission = ["settings"];

    const userPermission = [
      ...defaultPermission,
      ...($user.value?.permissions?.map((el) => el.feature_name) || []),
    ];

    return links.filter((el) => {
      return userPermission.includes(el.name);
    });
  });

  return {
    linksAllowed,
    hasPermission,
    hasPermissionVisit,
  };
}
