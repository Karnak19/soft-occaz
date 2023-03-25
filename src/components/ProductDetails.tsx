import {
  CheckCircleIcon,
  XCircleIcon,
  BoltIcon,
  Battery0Icon,
  ShieldExclamationIcon,
  CpuChipIcon,
  FireIcon,
  FunnelIcon,
  SwatchIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { cn } from "$/utils/cn";
import {
  AdsRecord,
  AdsResponse,
  AdsTypeOptions,
} from "$/utils/pocketbase-types";
import BigBadge from "./BigBadge";
import { variants } from "./Badge";
import ProductImageGallery from "./ProductImageGallery";
import { pb } from "$/utils/pocketbase";

const iconsMap: Record<AdsTypeOptions, JSX.Element> = {
  [AdsTypeOptions.ptw]: (
    <Battery0Icon
      className={cn("h-6 w-6 mx-auto", variants[AdsTypeOptions.ptw])}
    />
  ),
  [AdsTypeOptions.aeg]: (
    <BoltIcon className={cn("h-6 w-6 mx-auto", variants[AdsTypeOptions.aeg])} />
  ),
  [AdsTypeOptions.gbb]: (
    <FunnelIcon
      className={cn("h-6 w-6 mx-auto", variants[AdsTypeOptions.gbb])}
    />
  ),
  [AdsTypeOptions.gbbr]: (
    <FireIcon className={cn("h-6 w-6 ", variants[AdsTypeOptions.gbbr])} />
  ),
  [AdsTypeOptions.hpa]: (
    <CpuChipIcon className={cn("h-6 w-6 ", variants[AdsTypeOptions.hpa])} />
  ),
  [AdsTypeOptions.gear]: (
    <ShieldExclamationIcon
      className={cn("h-6 w-6 ", variants[AdsTypeOptions.gear])}
    />
  ),
  [AdsTypeOptions.autres]: (
    <SwatchIcon className={cn("h-6 w-6 ", variants[AdsTypeOptions.autres])} />
  ),
};

export default function ProductDetails(props: AdsResponse) {
  const images = props.field?.map((field) => {
    return {
      id: field,
      name: "Angled view",
      alt: "Angled front view with bag zipped and handles upright.",
      src: pb.getFileUrl(props, field),
    };
  });

  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
              {props.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-zinc-50">
                {props.price} €
              </p>
            </div>
          </div>

          {/* Image gallery */}
          {!!images?.length && (
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <ProductImageGallery images={images} />
            </div>
          )}

          <div className="flex flex-col gap-8 my-5 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {props.envoi ? (
                  <BigBadge
                    variant={AdsTypeOptions.aeg}
                    className="text-green-800 bg-green-200"
                    title="Envoi"
                    description="Ce vendeur propose un envoi"
                    icon={
                      <TruckIcon
                        className="w-6 h-6 mx-auto text-green-800"
                        aria-hidden="true"
                      />
                    }
                  />
                ) : (
                  <BigBadge
                    variant={AdsTypeOptions.aeg}
                    className="text-red-800 bg-red-200"
                    title="Envoi"
                    description="Ce vendeur ne propose pas d'envoi"
                    icon={
                      <TruckIcon
                        className="w-6 h-6 mx-auto text-red-800"
                        aria-hidden="true"
                      />
                    }
                  />
                )}

                <BigBadge
                  variant={props.type}
                  icon={iconsMap[props.type]}
                  className="uppercase"
                  title={props.type}
                />
              </dl>
            </section>
            {/* Product details */}
            <div
              className="prose-sm prose prose-zinc dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
