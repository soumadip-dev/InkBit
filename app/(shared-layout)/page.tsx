import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowRight,
  MessageCircle,
  PenTool,
  Search,
  Shield,
  Users,
  Zap,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  Globe,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'InkBit - Dynamic Blog-Sharing Platform',
  description:
    'A modern blogging platform with real-time updates, community engagement, and seamless publishing built with Next.js',
  keywords: [
    'InkBit',
    'Blog Platform',
    'Real-time Blogging',
    'Community Engagement',
    'Next.js',
    'Convex',
    'TypeScript',
  ],
  authors: [{ name: 'Soumadip Majila' }],
  creator: 'Soumadip Majila',
  publisher: 'Soumadip Majila',
  category: 'Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'InkBit - Dynamic Blog-Sharing Platform',
    description: 'Modern blog-sharing with real-time updates and community engagement',
    type: 'website',
    locale: 'en_IN',
    siteName: 'InkBit',
  },
  twitter: {
    title: 'InkBit - Dynamic Blog-Sharing Platform',
    description: 'Modern blog-sharing with real-time updates and community engagement',
    card: 'summary_large_image',
    site: '@InkBit',
    creator: '@InkBit',
  },
};

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Real-time Comments',
    description:
      'Live commenting system that updates instantly as readers engage with your content',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: 'Effortless Publishing',
    description:
      'Beautiful editor, one-click image uploads, and instant publishing. Focus on your words, not the tech.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Vibrant Community',
    description:
      'Engage with readers through live comments. Build meaningful conversations that keep readers coming back.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Smart Discovery',
    description:
      'Powerful search and filtering help readers find your content. No more getting lost in the archives.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description:
      'Bank-level security with role-based access. Your content is safe, private, and always under your control.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Live Connections',
    description:
      "See who's reading your posts right now. Turn passive readers into active community members.",
    gradient: 'from-pink-500 to-rose-500',
  },
];

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Tech Blogger',
    content:
      'The real-time commenting changed how I engage with my readers. Instant feedback is incredible!',
    avatar: '/avatars/01.png',
    stats: '4.2K followers',
  },
  {
    name: 'Sarah Miller',
    role: 'Content Creator',
    content: 'Dark mode and responsive design make writing and reading a pleasure on any device.',
    avatar: '/avatars/02.png',
    stats: '2.8K followers',
  },
  {
    name: 'David Chen',
    role: 'Developer',
    content:
      'TypeScript end-to-end gives me confidence in my code. The search feature is super fast!',
    avatar: '/avatars/03.png',
    stats: '3.5K followers',
  },
];

const stats = [
  { label: 'Active Writers', value: '1,000+' },
  { label: 'Posts Published', value: '10,000+' },
  { label: 'Comments Monthly', value: '50,000+' },
  { label: 'Avg. Rating', value: '4.9' },
];

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Secure authentication with Convex',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    number: '02',
    title: 'Create',
    description: 'Write posts with image uploads',
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    number: '03',
    title: 'Engage',
    description: 'Real-time comments and presence',
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    number: '04',
    title: 'Discover',
    description: 'Search and filter through blogs',
    icon: <Search className="h-5 w-5" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
              Built with Modern Stack
              <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight sm:leading-tight">
              Share Your{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Story
                </span>
                <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
              </span>
              ,{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-transparent">
                  Live
                </span>
                <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent to-primary/50 rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0">
              A dynamic blog-sharing platform with real-time updates, community engagement, and
              seamless publishing. Where every voice matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-2 sm:px-0">
              <Button
                size="lg"
                className="gap-2 sm:gap-3 h-12 sm:h-14 px-6 sm:px-8 lg:px-10 text-sm sm:text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 group w-full sm:w-auto"
                asChild
              >
                <Link href="/create">
                  <span className="flex items-center justify-center gap-2">
                    Start Writing Free
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 lg:px-10 text-sm sm:text-base font-medium border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group w-full sm:w-auto"
                asChild
              >
                <Link href="/blog" className="flex items-center justify-center gap-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Blogs
                </Link>
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-12 sm:pt-16 max-w-3xl mx-auto px-2 sm:px-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="space-y-1 sm:space-y-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6">
            <Badge
              variant="outline"
              className="px-3 py-1.5 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium animate-fade-in"
            >
              ✨ Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              Everything You Need
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light px-2 sm:px-0">
              Modern blogging tools designed for creators who want to make an impact
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="space-y-3 sm:space-y-5 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-500 group-hover:scale-110`}
                    >
                      {feature.icon}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-muted-foreground/20">
                      0{index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6">
            <Badge
              variant="outline"
              className="px-3 py-1.5 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium"
            >
              📝 Process
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              Start in Minutes
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light px-2 sm:px-0">
              Simple steps to share your voice with the world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[70%] w-[60%] h-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent group-hover:from-primary/50 transition-all duration-300" />
                )}
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-2xl sm:rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50" />
                  <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-primary/60 text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold">{step.number}</span>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed px-2 sm:px-0">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6">
            <Badge
              variant="outline"
              className="px-3 py-1.5 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium"
            >
              ❤️ Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              Loved by Writers
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light px-2 sm:px-0">
              Join thousands of creators sharing their stories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-lg sm:text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left space-y-1 flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-bold truncate">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm truncate">
                        {testimonial.role}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{testimonial.stats}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light italic line-clamp-3">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/50 group-hover:text-primary/50 transition-colors duration-300" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            <div className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 w-32 h-32 sm:w-48 sm:h-48 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 w-32 h-32 sm:w-48 sm:h-48 bg-primary/5 rounded-full blur-3xl" />
            <CardContent className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-10">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-xl sm:rounded-2xl blur-lg" />
                  <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-white shadow-xl">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight px-2 sm:px-0">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto px-2 sm:px-0">
                    Join our platform with real-time features, modern design, and a thriving
                    community. Share your unique voice with the world.
                  </p>
                </div>
                <div className="pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="gap-2 sm:gap-3 h-12 sm:h-14 md:h-16 px-6 sm:px-8 lg:px-12 text-sm sm:text-base md:text-lg font-medium shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 group w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/create">
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        Get Started Free
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm text-muted-foreground pt-4 sm:pt-6">
                  <span className="flex items-center justify-center gap-2 bg-background/50 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    Setup in 2 minutes
                  </span>
                  <span className="flex items-center justify-center gap-2 bg-background/50 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    No credit card required
                  </span>
                  <span className="flex items-center justify-center gap-2 bg-background/50 px-3 py-2 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    Full-featured free tier
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <PenTool className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                InkBit
              </div>
              <p className="text-sm sm:text-base lg:text-lg font-light text-muted-foreground">
                Where stories come to life, together
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span>Built with Next.js & Convex</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
              <span className="sm:hidden">•</span>
              <span>Real-time updates</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
              <span className="sm:hidden">•</span>
              <span>Modern UI</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
              <span className="sm:hidden">•</span>
              <span>Community engagement</span>
            </div>
            <p className="text-xs text-muted-foreground/60 pt-2 sm:pt-4">
              © {new Date().getFullYear()} InkBit. Crafted with passion for storytellers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
