import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="bg-linen">
      <div className="mx-auto max-w-xl px-5 py-28 md:py-36 text-center">
        <p className="heading-display text-8xl text-primary/20">404</p>
        <h1 className="heading-display mt-4 text-5xl">This page went dark.</h1>
        <p className="mt-4 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <ButtonLink href="/shop" arrow>Customize Your Blind</ButtonLink>
          <ButtonLink href="/" variant="outline">Back to Home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
