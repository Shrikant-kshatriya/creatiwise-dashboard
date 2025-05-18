import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ScrollText,
  UserRound,
  MessageCircle,
  BellRing,
  Info,
  CircleDollarSign,
  Star,
  Plug,
  Link2,
  Cable,
  Newspaper

} from "lucide-react"
const data : any = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Articles",
      url: "#",
      icon: ScrollText,
      isActive: true,
      items: [
        {
          title: "Create Article",
          url: "#",
        },
        {
          title: "Generated Articles",
          url: "#",
        },
        {
          title: "Keyword Projects",
          url: "#",
        },
        {
          title: "AI Keyword to Article",
          url: "#",
        },
        {
          title: "Steal Competitor Keyword",
          url: "#",
        },
        {
          title: "Import Keyword from GSC",
          url: "#",
        },
        {
          title: "Manual Keyword to Article",
          url: "#",
        },
        {
          title: "Bulk Keyword to Article",
          url: "#",
        },
        {
          title: "Longtail Keyword to Article",
          url: "#",
        },
        {
          title: "Article Settings",
          url: "#",
        },
      ],
    },
  ],
  navsubs: [
    {
      name: "Auto Blog",
      url: "#",
      icon: Newspaper,
    },
    {
      name: "Internal Links",
      url: "#",
      icon: Cable,
    },
    {
      name: "Free Backlinks",
      url: "#",
      icon: Link2,
    },
    {
      name: "Integrations",
      url: "#",
      icon: Plug,
    },
    {
      name: "Subscription",
      url: "#",
      icon: Star,
    },
    {
      name: "Affiliate Program",
      url: "#",
      icon: CircleDollarSign,
    },
    {
      name: "Help Center",
      url: "#",
      icon: Info,
    },
    {
      name: "Updates",
      url: "#",
      icon: BellRing,
    },
    {
      name: "Live Chat Support",
      url: "#",
      icon: MessageCircle,
    },
  ],
  navFooter: 
    {
      name: "Profile",
      url: "#",
      icon: UserRound,
    }
}

export default data;