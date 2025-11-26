// Server component - avoid client-only imports here so server-only libs (fs, path) can be used
// Note: client components (forms, galleries) remain marked with "use client"
import Hero from "@/components/Hero";
import Slideshow from "@/components/Slideshow";
// import Timeline from "@/components/Timeline";
import CondolenceForm from "@/components/CondolenceForm";
import CondolenceList from "@/components/CondolenceList";
import ImageGallery from "@/components/ImageGallery";

export default function Home() {
  // server-rendered page; client subcomponents should call router.refresh() after mutations

  const events = [
    "Born in Lagos",
    "Worked in Afromedia PLC, Lagos",
    "Moved to Ilorin",
    "Lived in: Lagos, Ilorin, Asaba, Abuja, UK, Abeokuta",
    "Died in Lagos",
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <Hero />

      <section className="text-center my-8 px-4">
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Forever in our hearts, a loving wife, mother, grandmother, and friend.
          Please share your condolences, memories, and testimonies below.
        </p>
      </section>

      {/* Form (left) and Slideshow (right on desktop only) */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <CondolenceForm />
        </div>

        {/* <div className="flex justify-center items-start"> */}
        {/* Slideshow is hidden on small screens via the component's internal classes */}
        <Slideshow />
        {/* </div> */}
      </div>

      {/* Condolence list full width below */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
          Messages & Testimonies
        </h2>
        <CondolenceList />
      </section>

      {/* Gallery section */}
      <section id="image-gallery" className="max-w-6xl mx-auto px-4 mt-12">
        {/* Gallery component would go here */}
        <ImageGallery />
      </section>
    </main>
  );
}
