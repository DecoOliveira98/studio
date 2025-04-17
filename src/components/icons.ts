import {ArrowRight, Check, ChevronsUpDown, Circle, Copy, Edit, ExternalLink, File, HelpCircle, Home, Loader2, Mail, MessageSquare, Moon, Plus, PlusCircle, Search, Server, Settings, Share2, Shield, Sun, Trash, User, X, Workflow} from 'lucide-react';

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
    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 15v18h30V15H9Zm24 3-12 8-12-8v-3l12 8 12-8v3Z"/></svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m0 2H5v14h14V5Z"/><path d="M8 10h2v5H8zm1-1.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"/><path d="M14 10h2v2h-2Zm0 3h2v2h-2Zm0 3h2v2h-2Z"/></svg>
  ),
  outlook: () => (
    <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2,4 L2,28 L30,28 L30,4 L2,4 Z M22.75,16.312 L2.062,27.156 L2,7.437 L22.75,16.312 Z M29.937,7.437 L9.25,16.312 L30,27.156 L29.937,7.437 Z"/></svg>
  ),
};

export {Icons};
