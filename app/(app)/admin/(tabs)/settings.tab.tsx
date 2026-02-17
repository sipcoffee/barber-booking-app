"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Store, Clock, Mail, Loader2 } from "lucide-react";
import { useShopSettings, updateShopSettings } from "@/lib/swr";

export function SettingsTab() {
  const { settings, isLoading } = useShopSettings();
  const [saving, setSaving] = useState(false);

  // Form state
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("20:00");
  const [slotDuration, setSlotDuration] = useState("30");
  const [closedDays, setClosedDays] = useState<number[]>([0]);

  // Sync form state when settings load
  useEffect(() => {
    if (settings) {
      setShopName(settings.shopName);
      setPhone(settings.phone);
      setEmail(settings.email);
      setAddress(settings.address);
      setOpenTime(settings.openTime);
      setCloseTime(settings.closeTime);
      setSlotDuration(settings.slotDuration.toString());
      setClosedDays(settings.closedDays);
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateShopSettings({
        shopName,
        phone,
        email,
        address,
        openTime,
        closeTime,
        slotDuration: parseInt(slotDuration),
        closedDays,
      });
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleClosedDay = (dayIndex: number) => {
    setClosedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex]
    );
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
      {/* Shop Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle>Shop Information</CardTitle>
          </div>
          <CardDescription>
            Basic information about your barber shop
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Business Hours</CardTitle>
          </div>
          <CardDescription>
            Set your shop&apos;s operating hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="openTime">Opening Time</Label>
              <Select value={openTime} onValueChange={setOpenTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={`${hour.toString().padStart(2, "0")}:00`}
                    >
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeTime">Closing Time</Label>
              <Select value={closeTime} onValueChange={setCloseTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => i + 12).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={`${hour.toString().padStart(2, "0")}:00`}
                    >
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slotDuration">Appointment Slot Duration</Label>
            <Select value={slotDuration} onValueChange={setSlotDuration}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Closed Days</Label>
            <div className="flex flex-wrap gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <Button
                    key={day}
                    variant={closedDays.includes(index) ? "default" : "outline"}
                    size="sm"
                    className="w-14"
                    onClick={() => toggleClosedDay(index)}
                  >
                    {day}
                  </Button>
                )
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to toggle days when the shop is closed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Configure email notifications for bookings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notificationEmail">Notification Email</Label>
            <Input
              id="notificationEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Receive booking notifications at this email address
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  );
}
