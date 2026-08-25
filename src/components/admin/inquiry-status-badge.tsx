import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE_CLASSNAMES, STATUS_LABELS, type InquiryStatus } from "./inquiry-status";

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <Badge variant="outline" className={STATUS_BADGE_CLASSNAMES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
