'use client';

/*

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const participantData = [
  { name: "High School", value: 30 },
  { name: "University", value: 45 },
  { name: "Early Career", value: 25 },
];

const resourceData = [
  { name: "Events", count: 120 },
  { name: "Competitions", count: 85 },
  { name: "Programs", count: 64 },
];

const growthData = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3600 },
  { month: "Mar", users: 4200 },
  { month: "Apr", users: 6800 },
  { month: "May", users: 8200 },
  { month: "Jun", users: 9000 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

*/

export function StatisticsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The OrbitView Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform aims to provide thousands of individuals with career-accelerating opportunities every day, week, month, or year.
          </p>
        </div>

       {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Distribution</CardTitle>
              <CardDescription>Breakdown of available opportunities</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} resources`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--chart-2))"
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                    label={{ position: 'right', fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Participant distribution by career stage</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {participantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Monthly active users</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value} users`, 'Active Users']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Bar 
                    dataKey="users" 
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>*/}
      </div>
    </section>
  );
}