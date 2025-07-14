"use client"

import type React from "react"

import { useState } from "react"
import { X, Trash2, Calendar, Clock } from "lucide-react"

interface StreamSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  streamTitle: string
  currentFrequency: string
  currentDay?: string
  onSave: (settings: StreamSettings) => void
  onDelete: () => void
}

interface StreamSettings {
  frequency: "Daily" | "Weekly" | "Monthly"
  dayOfWeek?: string
  dayOfMonth?: number
  time?: string
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const daysOfMonth = Array.from({ length: 28 }, (_, i) => i + 1) // Safe range for all months

export function StreamSettingsModal({
  isOpen,
  onClose,
  streamTitle,
  currentFrequency,
  currentDay,
  onSave,
  onDelete,
}: StreamSettingsModalProps) {
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Monthly">(
    (currentFrequency as "Daily" | "Weekly" | "Monthly") || "Weekly",
  )
  const [dayOfWeek, setDayOfWeek] = useState(currentDay || "Friday")
  const [dayOfMonth, setDayOfMonth] = useState(1)
  const [time, setTime] = useState("09:00")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    const settings: StreamSettings = {
      frequency,
      time,
    }

    if (frequency === "Weekly") {
      settings.dayOfWeek = dayOfWeek
    } else if (frequency === "Monthly") {
      settings.dayOfMonth = dayOfMonth
    }

    onSave(settings)
    onClose()
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete()
      onClose()
    } else {
      setShowDeleteConfirm(true)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <h2 className="text-xl font-bold text-white">Edit Stream: {streamTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Frequency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Update Frequency</label>
            <div className="space-y-3">
              {(["Daily", "Weekly", "Monthly"] as const).map((freq) => (
                <label key={freq} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={(e) => setFrequency(e.target.value as "Daily" | "Weekly" | "Monthly")}
                    className="w-4 h-4 text-[#FF6600] bg-[#121212] border-[#333333] focus:ring-[#FF6600] focus:ring-2"
                  />
                  <span className="ml-3 text-gray-200">{freq}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Day Selection for Weekly */}
          {frequency === "Weekly" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Day of the Week</label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="w-full bg-[#121212] border border-[#333333] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600]"
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Day Selection for Monthly */}
          {frequency === "Monthly" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Day of the Month</label>
              <select
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(Number(e.target.value))}
                className="w-full bg-[#121212] border border-[#333333] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600]"
              >
                {daysOfMonth.map((day) => (
                  <option key={day} value={day}>
                    {day}
                    {day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Clock className="w-4 h-4 inline mr-2" />
              Preferred Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#121212] border border-[#333333] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600]"
            />
            <p className="text-xs text-gray-500 mt-1">Time zone: Your local time</p>
          </div>

          {/* Preview */}
          <div className="bg-[#121212] border border-[#333333] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Schedule Preview</span>
            </div>
            <p className="text-sm text-gray-400">
              {frequency === "Daily" && `Updates daily at ${time}`}
              {frequency === "Weekly" && `Updates every ${dayOfWeek} at ${time}`}
              {frequency === "Monthly" &&
                `Updates on the ${dayOfMonth}${dayOfMonth === 1 ? "st" : dayOfMonth === 2 ? "nd" : dayOfMonth === 3 ? "rd" : "th"} of each month at ${time}`}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#333333] p-6">
          <div className="flex items-center justify-between">
            {/* Delete Button */}
            <div>
              {!showDeleteConfirm ? (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-[#FF0000] hover:text-red-400 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Stream
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Are you sure?</span>
                  <button
                    onClick={handleDelete}
                    className="bg-[#FF0000] hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white border border-[#333333] hover:border-[#444444] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#FF6600] hover:bg-[#e55a00] text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
