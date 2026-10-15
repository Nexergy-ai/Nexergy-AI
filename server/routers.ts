getUploadUrl: publicProcedure
  .input(
    z.object({
      fileName: z.string(),
      fileType: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const fileKey = `facturas/${Date.now()}-${input.fileName}`;
      const command = new PutObjectCommand({
        Bucket: "nexergy-plant-data",
        Key: fileKey,
        ContentType: input.fileType, // <--- DETALLE A CORREGIR
      });

      const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
      return { uploadUrl, fileKey };
    } catch (error) { ... }
  }),
