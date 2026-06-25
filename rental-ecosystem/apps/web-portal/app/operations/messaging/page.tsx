'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, X, Search } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockConversations, getConversationMessages, mockMessages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function MessagingPage() {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    mockConversations[0]?.id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = mockConversations.filter((conv) =>
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConv = mockConversations.find((c) => c.id === selectedConversation);
  const currentMessages = selectedConversation ? getConversationMessages(selectedConversation) : [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage('');
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Messaging</h1>
          <p className="text-muted-foreground mt-2">Communicate with tenants and agents</p>
        </div>

        {/* Messaging Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="bg-card rounded-lg border border-border flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={cn(
                      'w-full px-4 py-3 border-b border-border text-left hover:bg-accent transition-colors',
                      selectedConversation === conv.id && 'bg-primary/10 border-l-2 border-l-primary'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1">{conv.subject}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conv.participantNames.join(', ')}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          {currentConv ? (
            <div className="lg:col-span-2 bg-card rounded-lg border border-border flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">{currentConv.subject}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentConv.participantNames.join(', ')}
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex gap-3',
                        message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-xs px-4 py-2 rounded-lg',
                          message.senderId === currentUser.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent text-foreground'
                        )}
                      >
                        <p className="text-xs font-medium mb-1">{message.senderName}</p>
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={cn(
                            'text-xs mt-1',
                            message.senderId === currentUser.id
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {new Date(message.createdAt).toLocaleTimeString('en-KE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-sm">No messages yet</p>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-card rounded-lg border border-border flex items-center justify-center text-center">
              <div>
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold">Select a conversation</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Choose from the list to view messages
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
