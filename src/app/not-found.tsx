import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="text-6xl font-bold text-[#00473c]/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-black">Page not found</h1>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/shop">Customize Your Blinds</ButtonLink>
      </div>
    </section>
  );
}
