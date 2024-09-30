// import { ref, onMounted } from "vue";

// export function useGoogleMaps() {
//   const isGoogleMapsLoaded = ref(false);
//   const google = ref(null);

//   onMounted(() => {
//     if (window.google && window.google.maps) {
//       isGoogleMapsLoaded.value = true;
//       google.value = window.google;
//     } else {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCo9GfdUolCaUWAQi-tOonqQ3t2PPfJlMU&libraries=places`;
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         isGoogleMapsLoaded.value = true;
//         google.value = window.google;
//       };

//       document.head.appendChild(script);
//     }
//   });

//   return { isGoogleMapsLoaded, google };
// }
