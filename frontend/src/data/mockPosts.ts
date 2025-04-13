
import { BlogPost } from '@/services/blogService';
import { Comment } from '@/services/blogService';

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Minimalist Living',
    content: `
      ## Embracing Minimalism: A Path to Simplicity

      In an increasingly complex world, the allure of minimalist living has never been stronger. Minimalism isn't about deprivation; it's about intentionality. It's about making conscious choices about what we allow into our lives, focusing on what truly adds value, and letting go of the excess that weighs us down.

      ### The Core Principles of Minimalism

      1.  **Intentionality:** Every item we own should serve a purpose or bring us joy.
      2.  **Quality over Quantity:** Investing in fewer, higher-quality items that last longer.
      3.  **Conscious Consumption:** Being mindful of our purchases and avoiding impulse buys.
      4.  **Decluttering:** Regularly assessing our belongings and letting go of what we no longer need.
      5.  **Experiences over Things:** Prioritizing experiences and relationships over material possessions.

      ### Benefits of Minimalist Living

      *   **Reduced Stress:** A clutter-free environment leads to a calmer, more focused mind.
      *   **Increased Financial Freedom:** Spending less on unnecessary items frees up resources for what truly matters.
      *   **More Time:** Less time spent cleaning, organizing, and maintaining possessions.
      *   **Environmental Impact:** Reduced consumption leads to a smaller carbon footprint.
      *   **Greater Fulfillment:** Focusing on experiences and relationships leads to a more meaningful life.

      ### Getting Started with Minimalism

      1.  **Start Small:** Begin with a single area, like a drawer or a shelf.
      2.  **The KonMari Method:** Ask yourself if an item sparks joy. If not, thank it and let it go.
      3.  **One In, One Out:** For every new item you bring into your home, get rid of one similar item.
      4.  **Challenge Consumerism:** Question the need for every purchase.
      5.  **Embrace Digital Minimalism:** Declutter your digital life by unsubscribing from unnecessary emails and deleting unused apps.

      Minimalism is a journey, not a destination. It's about finding what works for you and creating a life that is intentional, meaningful, and free from excess.
    `,
    excerpt: 'Discover the art of minimalist living and how it can transform your life by focusing on intentionality and simplicity.',
    cover_image: 'https://images.unsplash.com/photo-1593074458744-7ccb08123029?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    published_at: '2024-01-25T10:00:00Z',
    read_time: 7,
    user_id: 'user123',
    author: {
      name: 'Jane Smith',
    },
    commentsCount: 3,
  },
  {
    id: 2,
    title: 'The Power of Daily Meditation',
    content: `
      ## Finding Inner Peace: The Practice of Daily Meditation

      In today's fast-paced world, finding moments of peace and tranquility can seem like a luxury. However, the practice of daily meditation offers a simple yet powerful way to cultivate inner peace, reduce stress, and improve overall well-being.

      ### What is Meditation?

      Meditation is a practice that involves training the mind to focus and redirect thoughts. It's not about emptying your mind, but rather about observing your thoughts and emotions without judgment.

      ### Benefits of Daily Meditation

      *   **Stress Reduction:** Meditation helps lower cortisol levels, reducing stress and anxiety.
      *   **Improved Focus:** Regular meditation enhances attention span and concentration.
      *   **Emotional Regulation:** Meditation helps you become more aware of your emotions and respond to them in a healthy way.
      *   **Increased Self-Awareness:** Meditation allows you to gain a deeper understanding of yourself and your thoughts.
      *   **Better Sleep:** Meditation can calm the mind and prepare the body for restful sleep.

      ### How to Meditate Daily

      1.  **Find a Quiet Space:** Choose a place where you can sit or lie down without being disturbed.
      2.  **Set a Timer:** Start with just 5-10 minutes and gradually increase the duration.
      3.  **Sit Comfortably:** You can sit on a cushion, a chair, or lie down.
      4.  **Focus on Your Breath:** Pay attention to the sensation of your breath entering and leaving your body.
      5.  **Acknowledge Your Thoughts:** When your mind wanders, gently redirect your attention back to your breath.
      6.  **Be Patient:** Meditation takes practice. Don't get discouraged if you find it difficult at first.

      ### Types of Meditation

      *   **Mindfulness Meditation:** Paying attention to the present moment without judgment.
      *   **Loving-Kindness Meditation:** Cultivating feelings of love and compassion for yourself and others.
      *   **Transcendental Meditation:** Using a mantra to quiet the mind.
      *   **Guided Meditation:** Following a guided visualization or narration.

      Daily meditation is a gift you can give yourself. It's a simple practice that can have a profound impact on your mental, emotional, and physical well-being.
    `,
    excerpt: 'Explore the transformative power of daily meditation and how it can help you find inner peace, reduce stress, and improve your overall well-being.',
    cover_image: 'https://images.unsplash.com/photo-1506126618818-88ebb3990424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    published_at: '2024-01-20T08:30:00Z',
    read_time: 6,
    user_id: 'user456',
    author: {
      name: 'John Doe',
    },
    commentsCount: 5,
  },
  {
    id: 3,
    title: 'Effective Time Management Techniques',
    content: `
      ## Mastering Your Day: Effective Time Management Techniques

      In a world filled with distractions and endless to-do lists, effective time management is essential for productivity and success. By implementing the right techniques, you can take control of your day, prioritize tasks, and achieve your goals.

      ### The Importance of Time Management

      *   **Increased Productivity:** Efficiently managing your time allows you to accomplish more in less time.
      *   **Reduced Stress:** Prioritizing tasks and setting realistic deadlines reduces stress and overwhelm.
      *   **Improved Focus:** Time management techniques help you stay focused on the task at hand.
      *   **Better Work-Life Balance:** Effective time management allows you to allocate time for both work and personal activities.
      *   **Achieving Goals:** By breaking down large goals into smaller, manageable tasks, you can make steady progress.

      ### Proven Time Management Techniques

      1.  **The Pomodoro Technique:** Work in focused 25-minute intervals, followed by a 5-minute break.
      2.  **The Eisenhower Matrix:** Prioritize tasks based on urgency and importance.
      3.  **Time Blocking:** Allocate specific blocks of time for specific tasks.
      4.  **The Two-Minute Rule:** If a task takes less than two minutes, do it immediately.
      5.  **Eat the Frog:** Tackle the most challenging task first thing in the morning.

      ### Tools for Time Management

      *   **To-Do List Apps:** Use apps like Todoist, Trello, or Asana to manage your tasks.
      *   **Calendar Apps:** Schedule appointments and deadlines using Google Calendar, Outlook Calendar, or Apple Calendar.
      *   **Time Tracking Apps:** Monitor how you spend your time using apps like Toggl Track or RescueTime.
      *   **Note-Taking Apps:** Capture ideas and information using apps like Evernote or Notion.

      Effective time management is a skill that can be learned and improved with practice. By implementing these techniques and tools, you can take control of your day and achieve your goals with greater ease.
    `,
    excerpt: 'Learn effective time management techniques to master your day, increase productivity, reduce stress, and achieve your goals.',
    cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d53bc86b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    published_at: '2024-01-15T14:00:00Z',
    read_time: 8,
    user_id: 'user789',
    author: {
      name: 'Emily White',
    },
    commentsCount: 2,
  },
];

export const mockComments: Comment[] = [
  {
    id: 101,
    blog_post_id: 1,
    content: 'Great post! I found the tips on minimalist living very helpful.',
    account_id: 'commenter1',
    created_at: '2024-01-26T09:00:00Z',
    author: {
      name: 'Commenter One',
    },
  },
  {
    id: 102,
    blog_post_id: 1,
    content: 'I agree, minimalism has truly changed my perspective on consumption.',
    account_id: 'commenter2',
    created_at: '2024-01-26T10:30:00Z',
    author: {
      name: 'Commenter Two',
    },
  },
  {
    id: 103,
    blog_post_id: 2,
    content: 'Meditation has been a game-changer for my mental health. Thanks for sharing!',
    account_id: 'commenter3',
    created_at: '2024-01-21T11:15:00Z',
    author: {
      name: 'Commenter Three',
    },
  },
  {
    id: 104,
    blog_post_id: 3,
    content: 'Time management is crucial. I will definitely try the Pomodoro Technique.',
    account_id: 'commenter4',
    created_at: '2024-01-16T13:45:00Z',
    author: {
      name: 'Commenter Four',
    },
  },
];

export const getCommentsForPost = (postId: string | number) => {
  return mockComments.filter(comment => {
    if (comment.blog_post_id === Number(postId)) {
      return comment;
    }
  });
};
