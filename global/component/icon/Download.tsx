import { Icon } from "@global/type/props/Icon";

import clsx from "clsx/lite";

export default function Download({
  color = "#000",
  size,
  className,
  changeOnTheme = false,
}: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="url(#pattern0_3462_1514)" />
      <defs>
        <pattern
          id="pattern0_3462_1514"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_3462_1514" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_3462_1514"
          width="100"
          height="100"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGF0lEQVR4nO2dXYhVVRTHf6PpZNLkjNkEQX6ME6NFH2oPZdprRA85mpk6L70XaepTpTUZUhn0UmSfGhQ1WiCZWhBEQZlOCvkQNZZSPVSM9gHmFDMndvw37C5jXefec+/e96wfHOZyP/ba56xz9l57rbXXgGEYhmEYhmEYhmEYhmEYhmEYhhELVwA9wGagDzgCHANOAkM6Tuq9I/qO++5qoLPenW8EzgfuAHYA3wFZhYdrYzuwTG0bZbIA2AacKrmgP+qu3wSsAOYBM4FWYIKOVr3nPrsLeBjYqd+Gbbm2nwPmm1bOzs3A/pIL9xmwBrgSaKrg4rnfXgWsBQ6WyNgHLDLF/HtueC+4QL8CjwNzcrxIc4EngN8CuXuB2UVWjBvHe4EzuiCDwIMadmqFk7VRxoDrwx8a5popGDOAT3URRjRxT6tjf9qAp4Fh9am/SE/Lcg1L7sS/Am4gHm4EvlbffgGW0uDcG9yFu4ApxMeFwGvB07ueBqRJE3UmhTjFxM7a4ObZUqGVFx1eGUNaQ6RCd2B0OKU0BOsCZdxCetyqvmdaEyU/gY/o0b+TdFmpcxhJeaLvDKypFOaM/+P+wPqaRYKLvs91As5iyZuHtKjMmz6d08HUFo+9wTrDmZF5M6wjby4CBnRuboWfjG/qjC5QrRZ9mY5acJPmEudm6SABvKPw+RrKzGqoEMfLkreHBFzo3lE4tYEVMi2I1ywkgaejFhNsPRWCvMJO5rtEHOnz8YxautDrpZC2IJ7iIpTRsU2dc24SCqAQx5OS+ywRrjv8mNpVIIXMldyTsa1LlgcxcAqkEBTMymJzqexQp+4roELWSbYzhaPB50257JCiKeRayT5BRCtznzfVVECFNAE/SX4UK/cedcY53iigQlA42slfRQRsVmdcRmFRFfKI5Lu/dWenOrOiwApZJflvEAGH1Zn5BVbI9UE+V905rs5ML7BCZkr+N0TAoDrjfDtFVcjFkv8zEeAzMiYWWCHNku8Cc3XHFEJcCrEhi7iGLJvUiWtSN7OXuMxen6vk9vRVygvyHE+qwaTuZLxapWSMqBaGj1bRdfKt2voAmJyjQiZLRiaZDeU68c5F50KplC7gB7X3EdCSg0Ja1HYmWdWIcL4Vk3Oxs8ru9xna/O/aPFRmOlG5CnEbhD4J4hfV2LY2TtZVFlPO7wl1yG09rgaXB1vLDpex/7AchbQqxOyHqWpdvOtiC1ChCgnV3j9xGfCl2v0CaK9AIe1qI1Obru1qsV7tvkRELAuywqvJpcDRMi7kfykkVOxRtZmH2b+ESNOAqjVsnctQczaFnOvQN9Y0oMHY0oBQ7ZBMFRLIQSkH1P7xUWLXoymkI/AiHMgpm3JrrIlyKECVKb0yj5NvAT6WjO9LzNVShXTpO5l+U675fC446+93bU1wE3uU+OIxbkdTHlwAvB+Y2VePopA5wVrmwxw3DPnF4DtEzKIgtTKvUhmTVMHHe1e92ZnptV8T7BuDC6Zc2rXXMIusEsWo7FVHX8xRRjOwO1B+VvJ6d86T7PZATvTM1navEdUOyYsJgWMzPPr0WV4s1rmdlts9CfxmlgFtlMyL8cArgTJeB87LUd6UwK3zAAnRLD9ULVzS47Xrt1ev86IpyFA8UOccgjHREUx8yZekADboXE6lNFSVsjQoreHKU6RKT3Aet5M4a3RnDamQS2rcBvzZQCVC/mGLTugv4G7SYXWgDJdU3jA0BUoZViGX2Pu7QcOU6/NjjVbAzHNPUKXt7Tpsny6HFlmGmRTitqw1NN2B9TWg2iGxsFi5Vd6aSn4CL5fpQWzbl4m9pI79aVP4wA9Rh2LZnlbrxeNGuVn8Hbmpxln0U+W19U/saZUFSW7RV006VFUnC+IpW3Pe0euimk8pnpEFjsJkF3x5sFCFXEJHYb8m1WsqtHLGafvy+iAG7ofLPSm40OvJPIVEQ7e6j33sks9qpYrdzNIQN1FHm95boKS1XiWx+RhJFsTAn4k50hfrHNOtCgk+76uS47hSdZbEmJCQ6lyzSnf9mxrOjulu9//yaFDv9Wst4Z+mwllMhmEYhmEYhmEYhmEYhmEYhmEYRMrfvTI1M2sfmiYAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}
