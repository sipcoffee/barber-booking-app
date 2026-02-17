"use client";

import { useState, useRef } from "react";
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
import { Plus, Pencil, Trash2, Mail, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useBarbers, createBarber, updateBarber, deleteBarber } from "@/lib/swr";
import type { Barber } from "@/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function BarbersTab() {
  const { barbers, isLoading } = useBarbers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [saving, setSaving] = useState(false);

  // Form refs
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const specialtiesRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteBarber(id);
      toast.success("Barber removed successfully");
    } catch (error) {
      console.error("Error deleting barber:", error);
      toast.error("Failed to remove barber");
    }
  };

  const handleEdit = (barber: Barber) => {
    setEditingBarber(barber);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingBarber(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value || null;
    const phone = phoneRef.current?.value || null;
    const bio = bioRef.current?.value || null;
    const specialtiesStr = specialtiesRef.current?.value || "";
    const specialties = specialtiesStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (!name) {
      toast.error("Barber name is required");
      return;
    }

    setSaving(true);
    try {
      if (editingBarber) {
        await updateBarber(editingBarber.id, { name, email, phone, bio, specialties });
        toast.success("Barber updated successfully");
      } else {
        await createBarber({
          name,
          email,
          phone,
          bio,
          specialties,
          imageUrl: null,
          isActive: true,
        });
        toast.success("Barber added successfully");
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving barber:", error);
      toast.error(
        editingBarber ? "Failed to update barber" : "Failed to add barber"
      );
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Barbers</CardTitle>
            <CardDescription>Manage your team of barbers</CardDescription>
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
                    ref={nameRef}
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
                      ref={emailRef}
                      defaultValue={editingBarber?.email || ""}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      ref={phoneRef}
                      defaultValue={editingBarber?.phone || ""}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    ref={bioRef}
                    defaultValue={editingBarber?.bio || ""}
                    placeholder="Short biography..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties">
                    Specialties (comma-separated)
                  </Label>
                  <Input
                    id="specialties"
                    ref={specialtiesRef}
                    defaultValue={editingBarber?.specialties.join(", ")}
                    placeholder="Fades, Beard Trim, Classic Cuts"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingBarber ? "Save Changes" : "Add Barber"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {barbers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No barbers found. Add your first barber to get started.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {barbers.map((barber) => (
                <Card key={barber.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={barber.imageUrl || ""}
                          alt={barber.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {getInitials(barber.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{barber.name}</h3>
                            {barber.email && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Mail className="h-3.5 w-3.5" />
                                {barber.email}
                              </div>
                            )}
                            {barber.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-3.5 w-3.5" />
                                {barber.phone}
                              </div>
                            )}
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
                        {barber.bio && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {barber.bio}
                          </p>
                        )}
                        {barber.specialties.length > 0 && (
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
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
