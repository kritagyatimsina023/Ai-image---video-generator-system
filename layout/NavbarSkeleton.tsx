import { Box, Container, Skeleton, Stack } from "@mui/material";

const NavbarSkeleton = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          sx={{
            height: { xs: 68, md: 76 },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Stack
            direction="row"
            spacing={1.1}
            sx={{
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rounded"
              width={34}
              height={34}
              sx={{
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,.08)",
              }}
            />

            <Skeleton
              variant="text"
              width={75}
              height={25}
              sx={{
                bgcolor: "rgba(255,255,255,.08)",
              }}
            />
          </Stack>

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={3.5}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={55 + index * 8}
                height={22}
                sx={{
                  bgcolor: "rgba(255,255,255,.07)",
                }}
              />
            ))}
          </Stack>

          {/* Right side */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            {/* Credit balance */}
            <Skeleton
              variant="rounded"
              width={90}
              height={34}
              sx={{
                display: { xs: "none", sm: "block" },
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,.07)",
              }}
            />

            {/* Avatar */}
            <Skeleton
              variant="circular"
              width={38}
              height={38}
              sx={{
                bgcolor: "rgba(255,255,255,.08)",
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default NavbarSkeleton;
