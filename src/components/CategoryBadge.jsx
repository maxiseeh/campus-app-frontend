import { Badge } from "./ui/Badge"

const CATEGORY_CONFIG = {
  study_group: {
    label: "Study Group",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  },
  event: {
    label: "Event",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
  },
  lost_found: {
    label: "Lost & Found",
    className: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200",
  },
  announcement: {
    label: "Announcement",
    className: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
  },
}

export function CategoryBadge({ category }) {
  const config = CATEGORY_CONFIG[category] || {
    label: category,
    className: "bg-gray-100 text-gray-800",
  }

  return (
    <Badge variant="outline" className={`font-medium ${config.className}`}>
      {config.label}
    </Badge>
  )
}