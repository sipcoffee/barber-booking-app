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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Clock, DollarSign } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import { toast } from "sonner";

const mockServices = [
  {
    id: "1",
    name: "Classic Haircut",
    description: "Traditional haircut with precision cutting and styling",
    duration: 30,
    price: 25,
    isActive: true,
  },
  {
    id: "2",
    name: "Beard Trim",
    description: "Expert beard shaping and trimming",
    duration: 20,
    price: 15,
    isActive: true,
  },
  {
    id: "3",
    name: "Haircut & Beard",
    description: "Complete grooming package with haircut and beard trim combo",
    duration: 45,
    price: 35,
    isActive: true,
  },
  {
    id: "4",
    name: "Hot Towel Shave",
    description: "Luxurious traditional hot towel shave",
    duration: 30,
    price: 30,
    isActive: true,
  },
  {
    id: "5",
    name: "Kids Haircut",
    description: "Gentle haircuts for children under 12",
    duration: 20,
    price: 18,
    isActive: true,
  },
  {
    id: "6",
    name: "Premium Package",
    description: "Full service including haircut, beard, hot towel, and styling",
    duration: 60,
    price: 55,
    isActive: true,
  },
];

export function ServicesTab() {
  const [services, setServices] = useState(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<typeof mockServices[0] | null>(null);

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    toast.success("Service deleted successfully");
  };

  const handleEdit = (service: typeof mockServices[0]) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Manage your barber shop services and pricing
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Edit Service" : "Add New Service"}
                </DialogTitle>
                <DialogDescription>
                  {editingService
                    ? "Update the service details below"
                    : "Fill in the details for the new service"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    defaultValue={editingService?.name}
                    placeholder="Classic Haircut"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={editingService?.description}
                    placeholder="Describe the service..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      defaultValue={editingService?.duration || 30}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      defaultValue={editingService?.price || 25}
                    />
                  </div>
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
                      editingService
                        ? "Service updated successfully"
                        : "Service added successfully"
                    );
                  }}
                >
                  {editingService ? "Save Changes" : "Add Service"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatDuration(service.duration)}
                    </div>
                    <div className="flex items-center gap-1 font-medium text-primary">
                      <DollarSign className="h-4 w-4" />
                      {formatPrice(service.price)}
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
