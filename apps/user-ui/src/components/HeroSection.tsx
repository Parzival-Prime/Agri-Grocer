import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative h-[85vh] flex flex-coljustify-center w-full">
      <div className="absolute w-full h-[85vh] z-1 bg-linear-to-r from-black/0 to-black/80"></div>
      <div className="absolute w-full h-[85vh] bg-[url('/Hero_bg.png')] bg-cover bg-center"></div>
      <div className="m-auto z-2 md:w-[80%] w-[90%] md:flex h-full items-center gap-10">
        
        <div className="md:w-1/2 h-full flex justify-center">
          {/* <Image src={"https://ik.imagekit.io/orz8zneye/products/product-1768800393939_BrEt43PDBN.jpg?updatedAt=1768800395795"} alt="" height={450} width={450} className='rounded-md' /> */}
        </div>

        <div className="md:w-1/2 ml-30">
          <p className="font-Roboto font-normal text-white pb-2 text-xl">
            starting from $40
          </p>
          <h1 className="text-white text-4xl font-extrabold font-Roboto">
            Best Shopping Platform for <br /> Agriculture and your Garden
          </h1>
          <p className="font-Oregano text-3xl pt-4 text-white">
            Exclusive Offer <span className="text-yellow-400">10%</span> this
            week
          </p>
          <br />
          <button
            onClick={() => router.push('/products')}
            className="w-35 flex items-center justify-center gap-2 font-semibold h-10 bg-white rounded-md text-black hover:text-neutral-800"
          >
            Shop Now <MoveRight />
          </button>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;
