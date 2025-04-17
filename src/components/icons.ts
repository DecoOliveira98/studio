import {ArrowRight, Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, X, Workflow} from 'lucide-react';
import React from 'react';

const Icons = {
  arrowRight: ArrowRight,
  check: Check,
  chevronDown: ChevronsUpDown,
  circle: Circle,
  workflow: Workflow,
  close: X,
  copy: Copy,
  dark: Moon,
  edit: Edit,
  externalLink: ExternalLink,
  file: File,
  help: HelpCircle,
  home: Home,
  light: Sun,
  loader: Loader2,
  mail: Mail,
  messageSquare: MessageSquare,
  plus: Plus,
  plusCircle: PlusCircle,
  search: Search,
  server: Server,
  settings: Settings,
  share: Share2,
  shield: Shield,
  spinner: Loader2,
  trash: Trash,
  user: User,
  gmail: () => (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M46.7 14.2c-.7-.7-6.3-6.2-11.7-11.5C30.9.7 29.7.1 24 0c-5.7.1-6.7.7-11 2.7C7.6 8 1.7 13.8 1 14.5c-.7.7-.7 1.8 0 2.5l22.8 21.6c.5.4 1.2.4 1.7 0l23-21.9c.7-.7.7-1.7 0-2.5zM4.8 17.3l18.5 17.6c.5.5 1.3.5 1.8 0l18.6-17.6C42.9 17 42 18 42 18.9V39c0 1.6-1.3 2.9-2.9 2.9H8c-1.6 0-2.9-1.3-2.9-2.9V18.9c0-.9.7-1.7 1.7-1.6z"></path>
    </svg>
  ),
};

export {Icons};
