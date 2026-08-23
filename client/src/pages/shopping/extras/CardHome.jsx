import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
function CardHome({ src, className}) {
    return (
      <div>
        <Card
          className="cursor-pointer"
          // onClick={() => }
        >
          <img
            src={src}
            width={300}
            height={256}
            loading="lazy"
            className={`w-full  ${className ? className : 'h-48 object-cover'}`}
          />
          {/* <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>{}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{}</p>
          </CardContent> */}
          {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
        </Card>
      </div>
    );
}

export default CardHome;