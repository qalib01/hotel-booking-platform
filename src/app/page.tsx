"use client"

import { Provider } from "react-redux";
import HeroSection from "../components/sections/hero";
import { store } from "../store/redux.store";

export default function Home() {
  return (
    <Provider store={store}>
      <HeroSection />
    </Provider>
  );
}
