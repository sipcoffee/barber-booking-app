import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const barbers = [
  {
    id: 1,
    name: "James Wilson",
    role: "Master Barber",
    bio: "15 years of experience specializing in classic cuts and hot towel shaves.",
    specialties: ["Classic Cuts", "Hot Towel Shave", "Beard Styling"],
    image: "/images/barbers/james.jpg",
    initials: "JW",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Barber",
    bio: "Expert in modern fades and creative designs. Award-winning stylist.",
    specialties: ["Fades", "Hair Design", "Color"],
    image: "/images/barbers/michael.jpg",
    initials: "MC",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Barber",
    bio: "Passionate about precision cuts and making every client look their best.",
    specialties: ["Precision Cuts", "Kids Haircuts", "Beard Trim"],
    image: "/images/barbers/david.jpg",
    initials: "DR",
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Barber",
    bio: "Bringing fresh perspectives and the latest trends to traditional barbering.",
    specialties: ["Trendy Styles", "Texture", "Styling"],
    image: "/images/barbers/alex.jpg",
    initials: "AT",
  },
];

export function BarbersSection() {
  return (
    <section id="barbers" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">
            Our skilled barbers bring years of experience and passion for their
            craft. Get to know the experts who will take care of your grooming
            needs.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber) => (
            <Card key={barber.id} className="text-center">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={barber.image} alt={barber.name} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {barber.initials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{barber.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {barber.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{barber.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {barber.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="text-xs px-2 py-1 bg-secondary rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4 pt-2">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${barber.name} Instagram`}
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${barber.name} Twitter`}
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
