import { PropsWithChildren } from "react";

export default function PageTitle({children}: PropsWithChildren) {
  return (
    <div>
        <h1 className="text-2xl">{children}</h1>
    </div>
  )
}
