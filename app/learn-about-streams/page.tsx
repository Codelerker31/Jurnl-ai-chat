import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Search, Plus, BarChart3 } from 'lucide-react';

export default function LearnAboutStreamsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Learn About Streams
          </h1>
          <p className="text-lg text-gray-300">
            Your personal AI research assistant that keeps you informed automatically
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="bg-[#1C1C1C] border-[#333333]">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Tired of constantly searching for updates on your favorite topics? Create a Stream.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A Stream is your personal AI research assistant that does the work for you. Just find a summary you find useful and tell our AI to keep track of the topic. It will then run in the background, find the latest news, and build an ongoing feed of concise updates, so you're always informed without the effort.
              </p>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="bg-[#1C1C1C] border-[#333333]">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">How it works:</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Simply click the Create Stream button next to any AI-generated summary to start your automated, live feed on that subject.
              </p>
            </CardContent>
          </Card>

          {/* Step by Step Guide */}
          <Card className="bg-[#1C1C1C] border-[#333333]">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">How to Create Your First Stream</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-[#FF6600]" />
                      <h3 className="text-xl font-semibold text-white">Start a Chat</h3>
                    </div>
                    <p className="text-gray-300">
                      Ask about any topic, person, or company you want to follow.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Search className="w-5 h-5 text-[#FF6600]" />
                      <h3 className="text-xl font-semibold text-white">Find a Good Summary</h3>
                    </div>
                    <p className="text-gray-300">
                      Let the AI search and provide its initial summary.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Plus className="w-5 h-5 text-[#FF6600]" />
                      <h3 className="text-xl font-semibold text-white">Click to Create</h3>
                    </div>
                    <p className="text-gray-300">
                      See the (+) icon next to the AI's answer? Click it.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-[#FF6600]" />
                      <h3 className="text-xl font-semibold text-white">All Set!</h3>
                    </div>
                    <p className="text-gray-300">
                      You've just created a live, auto-updating Stream. You can find all your streams on the Dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center py-8">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link href="/chat">
                <Button className="bg-[#FF6600] hover:bg-[#e55a00] text-white px-8 py-3 text-lg font-medium w-full sm:w-auto">
                  Start Your First Chat
                </Button>
              </Link>
              <Link href="/streams">
                <Button variant="outline" className="border-[#333333] text-gray-300 hover:text-white hover:bg-[#2A2A2A] px-8 py-3 text-lg font-medium w-full sm:w-auto">
                  View My Streams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 