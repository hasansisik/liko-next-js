import { Metadata } from 'next';
import ErrorMain from '@/page-components/error/error-main'
 
export const metadata: Metadata = {
  title: "Liko - Not Found Page",
};

export default function NotFound() {
  return (
    <ErrorMain/>
  )
}