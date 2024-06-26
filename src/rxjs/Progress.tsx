import { useState, useEffect } from "react";
import { interval, take, map } from "rxjs";
import { Progress } from "antd";

export default function RxProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const observable = interval(60).pipe(
      take(10),
      map((v) => (v + 1) * 10)
    );
    const subscription = observable.subscribe((x) => {
      setPercent(x);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="text-3xl mb-2">RxProgress</div>
      <Progress percent={percent} />
    </>
  );
}
