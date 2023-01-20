import { useLocalStore } from "mobx-react-lite";

const useAuthStore = () => {
  const store = useLocalStore(() => ({
    userName: "alex",
    changeName() {
      store.userName = "grisha MC Lagen";
    }
  }));

  return store;
};

export default useAuthStore;
