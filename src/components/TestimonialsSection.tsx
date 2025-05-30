// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { useTranslation } from '@/hooks/useTranslation';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext
// } from "@/components/ui/carousel";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const testimonials = [
//   {
//     id: 1,
//     name: "Aarav Sharma",
//     role: "student, Bengaluru",
//     avatar: "https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//testimonial_for_all_profession_lik_student%20(1).jpeg",
//     rating: 5,
//     text: "Can't wait for SawaRI to launch! The features look amazing and I know it's going to change how we travel in our city. Counting down the days!"
//   },
//   {
//     id: 2,
//     name: "Sneha Patel",
//     role: "Student, Ahmedabad",
//     avatar: "https://randomuser.me/api/portraits/women/21.jpg",
//     rating: 5,
//     text: "Saw the sneak peek of SawaRI and I'm so excited! Finally, an app that understands what we need. Launch soon, please!"
//   },
//   {
//     id: 3,
//     name: "Rohan Verma",
//     role: "Startup Founder, Delhi",
//     avatar: "https://randomuser.me/api/portraits/men/31.jpg",
//     rating: 5,
//     text: "The buzz around SawaRI is real! My friends and I are all waiting for launch day. The anticipation is building up!"
//   },
//   {
//     id: 4,
//     name: "Priya Iyer",
//     role: "Designer, Chennai",
//     avatar: "https://randomuser.me/api/portraits/women/41.jpg",
//     rating: 5,
//     text: "The app design looks so fresh and user-friendly. Can't wait to try SawaRI as soon as it's out!"
//   },
//   {
//     id: 5,
//     name: "Vikas Singh",
//     role: "Engineer, Lucknow",
//     avatar: "https://randomuser.me/api/portraits/men/51.jpg",
//     rating: 5,
//     text: "Everyone in my office is talking about SawaRI. We're all ready to download it on launch day!"
//   }
// ];

// const TestimonialsSection = () => {
//   const { t } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [autoSlide, setAutoSlide] = useState(true);

//   useEffect(() => {
//     let interval: number | undefined;
//     interval = window.setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 3000); // 3 seconds
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">
//             {t('testimonialsTitle')}
//           </h2>
//           <p className="mt-4 text-xl text-gray-600">
//             🚀 SawaRI is launching soon! Hear what early users and fans are saying. Join the excitement and be part of something big from day one!
//           </p>
//         </div>

//         <div className="mt-16 relative">
//           <div className="flex justify-center items-center gap-8">
//             <div className="flex-1 max-w-xs sm:max-w-2xl mx-auto">
//               <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <Avatar className="h-10 w-10 sm:h-16 sm:w-16">
//                       <AvatarImage src={testimonials[currentSlide].avatar} alt={testimonials[currentSlide].name} />
//                       <AvatarFallback>{testimonials[currentSlide].name.substring(0, 2).toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
//                         {testimonials[currentSlide].name}
//                       </h4>
//                       <p className="text-gray-600 text-xs sm:text-base">{testimonials[currentSlide].role}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={`text-lg sm:text-2xl ${
//                           i < testimonials[currentSlide].rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-base sm:text-lg">
//                   {testimonials[currentSlide].text}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center mt-8 gap-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setCurrentSlide(index);
//                 }}
//                 className={`h-2 w-2 rounded-full transition-colors ${
//                   currentSlide === index ? "bg-[#FD9D00]" : "bg-gray-300"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsSection;
