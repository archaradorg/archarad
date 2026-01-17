import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Loader2, LogOut, Upload } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { z } from 'zod';

interface Postcard {
  id: string;
  title_hu: string;
  title_ro: string;
  title_en: string;
  title_de: string;
  year: number | null;
  district: string | null;
  description_hu: string | null;
  description_ro: string | null;
  description_en: string | null;
  description_de: string | null;
  image_url: string;
}

interface PostcardFormData {
  title_hu: string;
  title_ro: string;
  title_en: string;
  title_de: string;
  year: string;
  district: string;
  description_hu: string;
  description_ro: string;
  description_en: string;
  description_de: string;
}

const initialFormData: PostcardFormData = {
  title_hu: '',
  title_ro: '',
  title_en: '',
  title_de: '',
  year: '',
  district: '',
  description_hu: '',
  description_ro: '',
  description_en: '',
  description_de: '',
};

// Validation schema for postcard form
const postcardSchema = z.object({
  title_hu: z.string().min(1, 'Hungarian title is required').max(200, 'Title must be less than 200 characters'),
  title_ro: z.string().min(1, 'Romanian title is required').max(200, 'Title must be less than 200 characters'),
  title_en: z.string().min(1, 'English title is required').max(200, 'Title must be less than 200 characters'),
  title_de: z.string().min(1, 'German title is required').max(200, 'Title must be less than 200 characters'),
  year: z.string().optional().refine(
    (val) => !val || (parseInt(val) >= 1800 && parseInt(val) <= 2100),
    { message: 'Year must be between 1800 and 2100' }
  ),
  district: z.string().max(100, 'District must be less than 100 characters').optional(),
  description_hu: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  description_ro: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  description_en: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  description_de: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
});

type ValidationErrors = Partial<Record<keyof PostcardFormData, string>>;

const Admin: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();

  const [postcards, setPostcards] = useState<Postcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PostcardFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (isAdmin) {
      fetchPostcards();
    }
  }, [isAdmin]);

  const fetchPostcards = async () => {
    try {
      const { data, error } = await supabase
        .from('postcards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPostcards(data || []);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to load postcards',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('postcards')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('postcards')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const validateForm = (): boolean => {
    try {
      postcardSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof PostcardFormData;
          errors[field] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the form errors before submitting',
        variant: 'destructive',
      });
      return;
    }
    
    setUploading(true);

    try {
      let imageUrl = editingId
        ? postcards.find((p) => p.id === editingId)?.image_url || ''
        : '';

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl && !editingId) {
        toast({
          title: 'Error',
          description: 'Please upload an image',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      const postcardData = {
        title_hu: formData.title_hu.trim(),
        title_ro: formData.title_ro.trim(),
        title_en: formData.title_en.trim(),
        title_de: formData.title_de.trim(),
        year: formData.year ? parseInt(formData.year) : null,
        district: formData.district.trim() || null,
        description_hu: formData.description_hu.trim() || null,
        description_ro: formData.description_ro.trim() || null,
        description_en: formData.description_en.trim() || null,
        description_de: formData.description_de.trim() || null,
        image_url: imageUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from('postcards')
          .update(postcardData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: 'Success', description: 'Postcard updated' });
      } else {
        const { error } = await supabase
          .from('postcards')
          .insert([postcardData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Postcard created' });
      }

      resetForm();
      fetchPostcards();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save postcard',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (postcard: Postcard) => {
    setFormData({
      title_hu: postcard.title_hu,
      title_ro: postcard.title_ro,
      title_en: postcard.title_en,
      title_de: postcard.title_de,
      year: postcard.year?.toString() || '',
      district: postcard.district || '',
      description_hu: postcard.description_hu || '',
      description_ro: postcard.description_ro || '',
      description_en: postcard.description_en || '',
      description_de: postcard.description_de || '',
    });
    setImagePreview(postcard.image_url);
    setEditingId(postcard.id);
    setIsFormOpen(true);
    setValidationErrors({});
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this postcard?')) return;

    try {
      const { error } = await supabase
        .from('postcards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Postcard deleted' });
      fetchPostcards();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete postcard',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsFormOpen(false);
    setValidationErrors({});
  };

  const getLocalizedTitle = (postcard: Postcard) => {
    const key = `title_${language}` as keyof Postcard;
    return postcard[key] as string;
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You do not have admin privileges.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-3xl lg:text-4xl text-foreground">
                {t('admin.title')}
              </h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsFormOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {t('admin.upload')}
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                {t('admin.logout')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-border">
                <h2 className="font-heading text-2xl text-foreground">
                  {editingId ? 'Edit Postcard' : t('admin.upload')}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-md"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Choose file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Year & District */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">{t('gallery.year')}</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="1900"
                      min="1800"
                      max="2100"
                    />
                    {validationErrors.year && (
                      <p className="text-xs text-destructive">{validationErrors.year}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">{t('gallery.district')}</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="District name"
                      maxLength={100}
                    />
                    {validationErrors.district && (
                      <p className="text-xs text-destructive">{validationErrors.district}</p>
                    )}
                  </div>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-2 gap-4">
                  {(['hu', 'ro', 'en', 'de'] as const).map((lang) => (
                    <div key={`title_${lang}`} className="space-y-2">
                      <Label htmlFor={`title_${lang}`}>
                        Title ({lang.toUpperCase()}) *
                      </Label>
                      <Input
                        id={`title_${lang}`}
                        value={formData[`title_${lang}` as keyof PostcardFormData]}
                        onChange={(e) => setFormData({ ...formData, [`title_${lang}`]: e.target.value })}
                        maxLength={200}
                        required
                      />
                      {validationErrors[`title_${lang}` as keyof PostcardFormData] && (
                        <p className="text-xs text-destructive">
                          {validationErrors[`title_${lang}` as keyof PostcardFormData]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-2 gap-4">
                  {(['hu', 'ro', 'en', 'de'] as const).map((lang) => (
                    <div key={`desc_${lang}`} className="space-y-2">
                      <Label htmlFor={`desc_${lang}`}>
                        Description ({lang.toUpperCase()})
                      </Label>
                      <Textarea
                        id={`desc_${lang}`}
                        value={formData[`description_${lang}` as keyof PostcardFormData]}
                        onChange={(e) => setFormData({ ...formData, [`description_${lang}`]: e.target.value })}
                        rows={3}
                        maxLength={2000}
                      />
                      {validationErrors[`description_${lang}` as keyof PostcardFormData] && (
                        <p className="text-xs text-destructive">
                          {validationErrors[`description_${lang}` as keyof PostcardFormData]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t('admin.cancel')}
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t('admin.save')}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Postcards List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : postcards.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t('gallery.noItems')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postcards.map((postcard) => (
                <Card key={postcard.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={postcard.image_url}
                      alt={getLocalizedTitle(postcard)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-heading">
                      {getLocalizedTitle(postcard)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      {postcard.year && <span>{postcard.year}</span>}
                      {postcard.year && postcard.district && <span>•</span>}
                      {postcard.district && <span>{postcard.district}</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(postcard)}
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(postcard.id)}
                        className="gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;