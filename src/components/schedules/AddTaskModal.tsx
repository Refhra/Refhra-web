"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EditableTask } from "@/components/types/Schedule";

interface AddTaskModalProps {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  newTask: EditableTask;
  setNewTask: React.Dispatch<React.SetStateAction<EditableTask>>;
  handleSaveTask: () => void;
}

const AddTaskModal = ({
  showModal,
  setShowModal,
  newTask,
  setNewTask,
  handleSaveTask,
}: AddTaskModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add / Edit Task
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to add it to your schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={newTask.title}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Priority</Label>
            <Select
              value={newTask.priority}
              onValueChange={(value) =>
                setNewTask((p) => ({
                  ...p,
                  priority: value as EditableTask["priority"],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={newTask.startTime}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, startTime: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>End Time</Label>
              <Input
                type="time"
                value={newTask.endTime}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, endTime: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Tag Color</Label>
            <input
              type="color"
              value={newTask.color}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, color: e.target.value }))
              }
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTask}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
