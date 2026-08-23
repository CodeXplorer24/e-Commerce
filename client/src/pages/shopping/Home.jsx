import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import CardHome from "./extras/CardHome.jsx";


const corouselImages = [
  { id: "img1", src: "/assets/crousal/img1.webp" }, 
  { id: "img2", src: "/assets/crousal/img2.webp" },
  { id: "img3", src: "/assets/crousal/img3.webp" },
  { id: "img4", src: "/assets/crousal/img4.webp" },
  { id: "img5", src: "/assets/crousal/img5.webp" },
  { id: "img6", src: "/assets/crousal/img6.webp" }
];

const shopPhones = [
  { id: "p6", src: "/assets/Phones/p6.webp", path: "" },
  { id: "p4", src: "/assets/Phones/p4.webp", path: "" },
  { id: "p7", src: "/assets/Phones/p7.webp", path: "" },
  { id: "p11", src: "/assets/Phones/p11.webp", path: "" },
  { id: "p10", src: "/assets/Phones/p10.webp", path: "" },
  { id: "p2", src: "/assets/Phones/p2.webp", path: "" },
];

const trendingOutfits = [
  { id: "s1", src: "/assets/Trending-Outfits/s1.webp", path: "" },
  { id: "s2", src: "/assets/Trending-Outfits/s2.webp", path: "" },
  { id: "s3", src: "/assets/Trending-Outfits/s3.webp", path: "" },
  { id: "s4", src: "/assets/Trending-Outfits/s4.webp", path: "" },
  { id: "s5", src: "/assets/Trending-Outfits/s5.webp", path: "" },
  { id: "s6", src: "/assets/Trending-Outfits/s6.webp", path: "" },
];

const toys = [
  { id: "t1", src: "/assets/Toys/toy1.webp", path: "" },
  { id: "t2", src: "/assets/Toys/toy2.webp", path: "" },
  { id: "t3", src: "/assets/Toys/toy3.webp", path: "" },
  { id: "t4", src: "/assets/Toys/toy4.webp", path: "" },
];

const travel = [
  { id: "b1", src: "/assets/Travel/b1.webp", path: "" },
  { id: "b2", src: "/assets/Travel/b2.webp", path: "" },
  { id: "b3", src: "/assets/Travel/b3.webp", path: "" },
  { id: "b4", src: "/assets/Travel/b4.webp", path: "" },
];

const clgEssentials = [
  { id: "e1", src: "/assets/College/e1.webp", path: "" },
  { id: "e2", src: "/assets/College/e2.webp", path: "" },
  { id: "e3", src: "/assets/College/e3.webp", path: "" },
  { id: "e4", src: "/assets/College/e4.webp", path: "" },
];

const beautyP = [
  { id: "bt1", src: "/assets/Beauty/bt1.webp", path: "" },
  { id: "bt2", src: "/assets/Beauty/bt2.webp", path: "" },
  { id: "bt3", src: "/assets/Beauty/bt3.webp", path: "" },
  { id: "bt4", src: "/assets/Beauty/bt4.webp", path: "" },
];

const books = [
  { id: "bk1", src: "/assets/Books/bk1.webp", path: "" },
  { id: "bk2", src: "/assets/Books/bk2.webp", path: "" },
  { id: "bk3", src: "/assets/Books/bk3.webp", path: "" },
  { id: "bk4", src: "/assets/Books/bk4.webp", path: "" },
  { id: "bk5", src: "/assets/Books/bk5.webp", path: "" },
  { id: "bk6", src: "/assets/Books/bk6.webp", path: "" },
];

const populars = [
  { id: "pop1", src: "/assets/Populars/pop1.webp", path: "" },
  { id: "pop2", src: "/assets/Populars/pop2.webp", path: "" },
  { id: "pop3", src: "/assets/Populars/pop3.webp", path: "" },
  { id: "pop4", src: "/assets/Populars/pop4.webp", path: "" },
  { id: "pop5", src: "/assets/Populars/pop5.webp", path: "" },
  { id: "pop6", src: "/assets/Populars/pop6.webp", path: "" },
];

function Home() {
    // Initialize state with a function so it only runs once, returning the array expected by shadcn
    const [plugin] = useState(() => [
      Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: false })
    ])

    return (
      <div>
        <div>
          <Carousel
            className="mx-0 mt-0"
            plugins={plugin}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {corouselImages.map((img, index) => (
                <CarouselItem key={img.id}>
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-87.5 object-cover cursor-pointer"
                    fetchPriority={index === 0 ? "high" : undefined}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 text-3xl bg-transparent hover:bg-transparent cursor-pointer" />
            <CarouselNext className="right-2 bg-transparent hover:bg-transparent cursor-pointer" />
          </Carousel>
        </div>
        <div className="hidden sm:block mx-2 md:mx-15 bg-linear-to-b from-lime-500 to-lime-50 border-lime-300 border my-5 rounded-xl">
          <h3 className="my-2 font-medium ml-2">Smartphones top picks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 m-2">
            {shopPhones.map((phone) => (
              <CardHome key={phone.id} src={phone.src} />
            ))}
          </div>
        </div>
        <div className="hidden sm:block sm:mx-2 md:mx-15  sm:bg-linear-to-b from-lime-500 to-lime-50 border-lime-300 border my-5 rounded-xl">
          <h3 className="my-2 font-medium ml-2">Trending outfits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 m-2">
            {trendingOutfits.map((tr) => (
              <CardHome key={tr.id} src={tr.src} />
            ))}
          </div>
        </div>
        <div className="md:mx-15 grid grid-cols-4 gap-1 bg-gray-200">
          <div className="border bg-white">
            <h2 className="ml-2 font-medium my-2">Toys </h2>
            <div className="grid  grid-cols-2 gap-2 m-2">
              {toys.map((toy) => (
                <CardHome key={toy.id} src={toy.src} className="h-34" />
              ))}
            </div>
          </div>
          <div className="border bg-white">
            <h2 className="ml-2 font-medium my-2">Shop for travelling </h2>
            <div className="grid  grid-cols-2 gap-2 m-2">
              {travel.map((tr) => (
                <CardHome key={tr.id} src={tr.src} className="h-34" />
              ))}
            </div>
          </div>
          <div className="border bg-white">
            <h2 className="ml-2 font-medium my-2">College Essentials </h2>
            <div className="grid  grid-cols-2 gap-2 m-2">
              {clgEssentials.map((clg) => (
                <CardHome key={clg.id} src={clg.src} className="h-34" />
              ))}
            </div>
          </div>
          <div className="border bg-white">
            <h2 className="ml-2 font-medium my-2">Beauty Products</h2>
            <div className="grid  grid-cols-2 gap-2 m-2">
              {beautyP.map((bt) => (
                <CardHome key={bt.id} src={bt.src} className="h-34 rounded-none" />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-15 my-5 cursor-pointer">
          <img
           src="/assets/summersale.jpg"
           alt=""
           className="h-75 w-full rounded-xl"
          />
        </div>
        <div className="hidden sm:block mx-2 md:mx-15 bg-linear-to-b from-lime-500 to-lime-50 border-lime-300 border my-5 rounded-xl">
          <h3 className="my-2 font-medium ml-2">The NewYork Times Best Selling Books</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 m-2">
            {books.map((book) => (
              <CardHome key={book.id} src={book.src} className="object-fill"/>
            ))}
          </div>
        </div>
        <div className="hidden sm:block mx-2 md:mx-15 bg-linear-to-b from-lime-500 to-lime-50 border-lime-300 border my-5 rounded-xl">
          <h3 className="my-2 font-medium ml-2">Popular picks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 m-2">
            {populars.map((popular) => (
              <CardHome key={popular.id} src={popular.src}/>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Home;
