import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';

const events = [
  {
    title: 'Tech Expo 2025',
    image: '/images/event1.png',
    slug: 'event-1',
    location: 'Bangalore',
    date: '2025-12-10',
    time: '09:30 AM',
  },
  {
    title: 'Developers Meetup',
    image: '/images/event2.png',
    slug: 'event-2',
    location: 'Hyderabad',
    date: '2025-12-14',
    time: '02:00 PM',
  },

  {
    title: 'AI Conference',
    image: '/images/event3.png',
    slug: 'event-3',
    location: 'Mumbai',
    date: '2025-12-20',
    time: '11:15 AM',
  },
  {
    title: 'Product Launch Event',
    image: '/images/event4.png',
    slug: 'event-4',
    location: 'Delhi',
    date: '2026-01-05',
    time: '04:45 PM',
  },
  {
    title: 'Tech Career Fair',
    image: '/images/event5.png',
    slug: 'event-5',
    location: 'Chennai',
    date: '2026-01-18',
    time: '10:20 AM',
  },
  {
    title: 'Open Source Summit',
    image: '/images/event6.png',
    slug: 'event-6',
    location: 'Pune',
    date: '2026-01-30',
    time: '01:00 PM',
  },
];

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Webinars, Workshops, All in One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events.map(event => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
