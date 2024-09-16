// // store.js
// import { proxy } from "valtio";

// // Define the initial state
// export const configuratorStore = proxy({
//   configurator: {
//     style: "",
//     width: "",
//     height: "",
//     depth: "",
//     feet: "",
//     backPanels: "",
//     finish: "",
//     color: "",
//   },
// });

// // Define the setter function
// export const setConfiguratorAttribute = (attribute, value) => {
//   if (configuratorStore.configurator.hasOwnProperty(attribute)) {
//     configuratorStore.configurator[attribute] = value;
//   } else {
//     console.warn(
//       `Attribute "${attribute}" does not exist in configurator state.`
//     );
//   }
// };

// store.js
import { proxy, subscribe } from "valtio";

// Define the initial state
const initialState = {
  style: "",
  width: "",
  height: "",
  depth: "",
  feet: "",
  backPanels: "",
  finish: "",
  color: "",
};

// Retrieve the state from localStorage if available
const persistedState = localStorage.getItem("configuratorStore");
const initialStateWithPersist = persistedState
  ? JSON.parse(persistedState)
  : initialState;

// Define the store with the initial state
export const configuratorStore = proxy({
  configurator: initialStateWithPersist,
});

// Define the setter function
export const setConfiguratorAttribute = (attribute, value) => {
  if (configuratorStore.configurator.hasOwnProperty(attribute)) {
    configuratorStore.configurator[attribute] = value;
  } else {
    console.warn(
      `Attribute "${attribute}" does not exist in configurator state.`
    );
  }
};

// Subscribe to changes in the store to persist them
subscribe(configuratorStore, () => {
  localStorage.setItem(
    "configuratorStore",
    JSON.stringify(configuratorStore.configurator)
  );
});
