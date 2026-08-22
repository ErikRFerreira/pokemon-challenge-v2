type Props = {
  title: string;
  subtitle?: string;
};

function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-lg">
      <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-surface mb-xs">
        {title}
      </h1>
      {subtitle && (
        <p className="text-on-surface-variant font-body-md text-body-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
