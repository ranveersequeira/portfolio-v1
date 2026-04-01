import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CascadeText from "@/components/CascadeText";
import PretextLines from "@/components/PretextLines";

export default function NotFound() {
  return (
    <div className="page-stack">
      <section className="not-found-shell">
        <div className="section-kicker">404</div>
        <CascadeText
          as="h1"
          className="page-title max-w-4xl"
          text="This route never made it through the interface review."
        />
        <PretextLines
          as="p"
          bodyClassName="section-copy"
          className="max-w-2xl"
          text={`No page is mapped to ${window.location.pathname}. The clean move is to head back to the portfolio and continue from there.`}
        />
        <Link className="primary-action" to="/">
          Return home
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
