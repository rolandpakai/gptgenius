import Link from "next/link";
import { getSingleTour, generateTourImage } from "@/utils/action";
import TourInfo from "@/components/TourInfo";
import prisma from "@utils/prisma";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  /*
  const tourImage = await generateTourImage({
    city: tour.city,
    country: tour.country,
  });
  */

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  
  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12" >
        Back to Tours
      </Link>
      {
        tourImage && (
          <Image
            src={tourImage}
            alt={tour.title}
            width={300}
            height={300}
            objectFit="cover"
            className="rounded-xl shadow-xl mb-15 h-96 w-96 object-cover"
            priority
          />
        )
      }
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;