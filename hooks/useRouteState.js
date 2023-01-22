import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRouteState() {
  const [isChanging, setIsChanging] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsChanging(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsChanging(false);
    });
  }, [router.events]);

  return { isChanging };
}
