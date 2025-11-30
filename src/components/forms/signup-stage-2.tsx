
import { Button } from "@/components/ui/button";

type Props = {
  getRole: (value: "seller" | "customer" | null)=>void;
};

export default function SignUpStage2({ getRole }: Props) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-1 text-center mb-12">
              <h1 className="text-2xl font-bold">
                What type of Role do you want?
              </h1>
            </div>


              <div className="flex flex-col items-center space-y-5 w-80">
                <Button className="w-32" onClick={()=>getRole("customer")}>Customer</Button>
                <Button className="w-32" onClick={()=>getRole("seller")}>Seller</Button>
              </div>

          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/signup-stage2.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
