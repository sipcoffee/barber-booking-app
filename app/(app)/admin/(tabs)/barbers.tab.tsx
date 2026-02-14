"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const mockBarbers = [
  {
    id: "1",
    name: "James Wilson",
    email: "james@barbershop.com",
    phone: "(555) 111-2222",
    bio: "15 years of experience specializing in classic cuts and hot towel shaves.",
    specialties: ["Classic Cuts", "Hot Towel Shave", "Beard Styling"],
    imageUrl: null,
    isActive: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@barbershop.com",
    phone: "(555) 222-3333",
    bio: "Expert in modern fades and creative designs. Award-winning stylist.",
    specialties: ["Fades", "Hair Design", "Color"],
    imageUrl: null,
    isActive: true,
  },
  {
    id: "3",
    name: "David Rodriguez",
    email: "david@barbershop.com",
    phone: "(555) 333-4444",
    bio: "Passionate about precision cuts and making every client look their best.",
    specialties: ["Precision Cuts", "Kids Haircuts", "Beard Trim"],
    imageUrl: null,
    isActive: true,
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex@barbershop.com",
    phone: "(555) 444-5555",
    bio: "Bringing fresh perspectives and the latest trends to traditional barbering.",
    specialties: ["Trendy Styles", "Texture", "Styling"],
    imageUrl: null,
    isActive: true,
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function BarbersTab() {
  const [barbers, setBarbers] = useState(mockBarbers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState<typeof mockBarbers[0] | null>(null);

  const handleDelete = (id: string) => {
    setBarbers(barbers.filter((b) => b.id !== id));
    toast.success("Barber removed successfully");
  };

  const handleEdit = (barber: typeof mockBarbers[0]) => {
    setEditingBarber(barber);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingBarber(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Barbers</CardTitle>
            <CardDescription>
              Manage your team of barbers
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Barber
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingBarber ? "Edit Barber" : "Add New Barber"}
                </DialogTitle>
                <DialogDescription>
                  {editingBarber
                    ? "Update the barber details below"
                    : "Fill in the details for the new barber"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={editingBarber?.name}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={editingBarber?.email || ""}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue={editingBarber?.phone || ""}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={editingBarber?.bio || ""}
                    placeholder="Short biography..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties (comma-separated)</Label>
                  <Input
                    id="specialties"
                    defaultValue={editingBarber?.specialties.join(", ")}
                    placeholder="Fades, Beard Trim, Classic Cuts"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsDialogOpen(false);
                    toast.success(
                      editingBarber
                        ? "Barber updated successfully"
                        : "Barber added successfully"
                    );
                  }}
                >
                  {editingBarber ? "Save Changes" : "Add Barber"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {barbers.map((barber) => (
              <Card key={barber.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={barber.imageUrl || ""} alt={barber.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {getInitials(barber.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{barber.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Mail className="h-3.5 w-3.5" />
                            {barber.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3.5 w-3.5" />
                            {barber.phone}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(barber)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(barber.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {barber.bio}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {barber.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="text-xs px-2 py-0.5 bg-secondary rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
