import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <Link href='/'>홈으로 가기</Link>
    </div>
  );
}
