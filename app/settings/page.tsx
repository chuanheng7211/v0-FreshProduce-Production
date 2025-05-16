"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import ProtectedRoute from "@/components/protected-route"

export default function Settings() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "settings" }}>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                  <Switch id="marketing-emails" />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="forecast-alerts">Forecast alerts</Label>
                  <Switch id="forecast-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="production-alerts">Production alerts</Label>
                  <Switch id="production-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="labor-alerts">Labor planning alerts</Label>
                  <Switch id="labor-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="yield-alerts">Yield threshold alerts</Label>
                  <Switch id="yield-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email notifications</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect with other services and tools.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">ERP System</h3>
                    <p className="text-sm text-muted-foreground">Connect to your ERP system</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">CRM</h3>
                    <p className="text-sm text-muted-foreground">Connect to your CRM</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Inventory Management</h3>
                    <p className="text-sm text-muted-foreground">Connect to your inventory system</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Accounting Software</h3>
                    <p className="text-sm text-muted-foreground">Connect to your accounting software</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Light
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Dark
                    </Button>
                    <Button className="flex-1">System</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Density</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Compact
                    </Button>
                    <Button className="flex-1">Default</Button>
                    <Button variant="outline" className="flex-1">
                      Comfortable
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Interface animations</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
