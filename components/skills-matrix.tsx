"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample skills data
const skillsData = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Assembly",
    assembly: 5,
    packaging: 3,
    quality: 2,
    maintenance: 4,
    supervision: 4,
  },
  {
    id: "EMP002",
    name: "Jane Doe",
    department: "Assembly",
    assembly: 4,
    packaging: 2,
    quality: 5,
    maintenance: 1,
    supervision: 3,
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    department: "Packaging",
    assembly: 3,
    packaging: 5,
    quality: 4,
    maintenance: 2,
    supervision: 3,
  },
  {
    id: "EMP004",
    name: "Sarah Williams",
    department: "Assembly",
    assembly: 5,
    packaging: 4,
    quality: 3,
    maintenance: 2,
    supervision: 5,
  },
  {
    id: "EMP005",
    name: "Michael Brown",
    department: "Quality Control",
    assembly: 2,
    packaging: 3,
    quality: 5,
    maintenance: 1,
    supervision: 4,
  },
]

const getSkillLevel = (level: number) => {
  switch (level) {
    case 1:
      return <span className="text-red-500">1</span>
    case 2:
      return <span className="text-orange-500">2</span>
    case 3:
      return <span className="text-amber-500">3</span>
    case 4:
      return <span className="text-green-500">4</span>
    case 5:
      return <span className="text-emerald-500">5</span>
    default:
      return <span>-</span>
  }
}

export default function SkillsMatrix() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search employees..." className="w-[250px]" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="assembly">Assembly</SelectItem>
              <SelectItem value="packaging">Packaging</SelectItem>
              <SelectItem value="quality">Quality Control</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button>Add Employee</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Assembly</TableHead>
              <TableHead className="text-center">Packaging</TableHead>
              <TableHead className="text-center">Quality</TableHead>
              <TableHead className="text-center">Maintenance</TableHead>
              <TableHead className="text-center">Supervision</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skillsData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell className="text-center">{getSkillLevel(employee.assembly)}</TableCell>
                <TableCell className="text-center">{getSkillLevel(employee.packaging)}</TableCell>
                <TableCell className="text-center">{getSkillLevel(employee.quality)}</TableCell>
                <TableCell className="text-center">{getSkillLevel(employee.maintenance)}</TableCell>
                <TableCell className="text-center">{getSkillLevel(employee.supervision)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border rounded-md">
        <h3 className="font-medium mb-2">Skill Level Legend</h3>
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-red-500 font-medium">1</span> - Basic knowledge
          </div>
          <div>
            <span className="text-orange-500 font-medium">2</span> - Limited experience
          </div>
          <div>
            <span className="text-amber-500 font-medium">3</span> - Competent
          </div>
          <div>
            <span className="text-green-500 font-medium">4</span> - Advanced
          </div>
          <div>
            <span className="text-emerald-500 font-medium">5</span> - Expert
          </div>
        </div>
      </div>
    </div>
  )
}
