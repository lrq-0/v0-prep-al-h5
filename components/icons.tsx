// icons.tsx
export const Icons = {
  categoryIcons: ({ icon, className }) => {
    const icons = {
      "message-square": <MessageSquare className={className} />,
      image: <ImageIcon className={className} />,
      video: <Video className={className} />,
      user: <User className={className} />,
      sparkles: <Sparkles className={className} />,
      "book-open": <BookOpen className={className} />,
      briefcase: <Briefcase className={className} />,
      code: <Code className={className} />,
      globe: <Globe className={className} />,
      heart: <Heart className={className} />,
      music: <Music className={className} />,
      "shopping-bag": <ShoppingBag className={className} />,
      star: <Star className={className} />,
    }
    return icons[icon] || <MessageSquare className={className} />
  },
  chevronDown: ({ className }) => <ChevronDown className={className} />,
  edit: ({ className }) => <Edit className={className} />,
  trash: ({ className }) => <Trash2 className={className} />,
}

// Necessary icons from Lucide React
import {
  MessageSquare,
  ImageIcon,
  Video,
  User,
  Sparkles,
  BookOpen,
  Briefcase,
  Code,
  Globe,
  Heart,
  Music,
  ShoppingBag,
  Star,
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react"
